import React, { useEffect, useState } from 'react'
import { styled } from '@mui/styles'

import { Grid } from '@mui/material'

import Graph from '@Components/atoms/Graph'
import PageHeader from '@Components/atoms/PageHeader'
import NoTransactions from '@Components/molecules/NoTransactions'

import { currentDate } from '@Helpers/currentDate'
import { useFirestore } from '@Hooks/useFirestore'

import {
  ITransaction,
  IGroupedCategoryObj,
  IDoughnutRecipe,
  IGraph,
} from '@/types'

const Container = styled('div')({
  backgroundColor: '#F0F5F7',
  flex: 1,
  overflow: 'auto',
})

const Content = styled('div')({
  padding: '5px',

  '@media screen and (min-width:768px)': {
    padding: '10px',
  },
})

const StatisticsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<ITransaction[] | []>([])
  const [graphs, setGraphs] = useState<IGraph[] | null>(null)

  const { currentMonth } = currentDate()
  const { getTransactionsData } = useFirestore()

  const generateRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`

  const getRandomColors = () => {
    const tmp: string[] = []
    for (let i = 0; i < 1000; i++) {
      const color = generateRandomColor()
      tmp.push(color)
    }
    return tmp
  }

  const colors = [
    '#011627',
    '#2a3f63',
    '#58A9CC',
    '#e87a13',
    '#66e028',
    '#b71cd6',
    '#5c47e6',
    '#e0e332',
    '#e32f29',
    '#21de6a',
  ].concat(getRandomColors())

  const getMonthTransactions = (array: ITransaction[]) =>
    array.filter(({ date }) => date.split('-')[1] === currentMonth)

  const reduceArrayElements = (array: ITransaction[]) =>
    array.map(({ category, amount }) => ({ category, amount }))

  const doughnutRecipe = (labels: string[], data: number[]) => ({
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        hoverOffset: 4,
      },
    ],
  })

  // grouping all values with the same category
  const groupArrayByCategory = (array): IGroupedCategoryObj[] => {
    const arr = reduceArrayElements(array)
    const result: IGroupedCategoryObj[] = []
    arr.reduce((res, value) => {
      if (!res[value.category]) {
        res[value.category] = {
          category: value.category,
          amount: 0,
        }
        result.push(res[value.category])
      }
      res[value.category].amount += value.amount
      return res
    }, {})

    return result
  }

  const handleCreateGraph = (
    graphData: IGroupedCategoryObj[]
  ): IDoughnutRecipe => {
    const labels = graphData.map(({ category }) => category)
    const data = graphData.map(({ amount }) => amount)
    const recipe = doughnutRecipe(labels, data)
    return recipe
  }

  const initGraphs = async () => {
    const transactions = await getTransactionsData()
    setTransactions(transactions)
  }

  useEffect((): any => {
    let isCanceled = false
    if (!isCanceled) initGraphs()

    return () => (isCanceled = true)
  }, [])

  useEffect(() => {
    if (transactions.length === 0) return
    const spentArray = transactions.filter(({ isSpent }) => isSpent)
    const earnedArray = transactions.filter(({ isSpent }) => !isSpent)
    const spentMonthlyArray = getMonthTransactions(spentArray)
    const earnedMonthlyArray = getMonthTransactions(earnedArray)

    const graphArrays = [
      spentArray,
      earnedArray,
      spentMonthlyArray,
      earnedMonthlyArray,
    ]

    const graphTitles = [
      'SPENT GRAPH (ALL TIME)',
      'EARNED GRAPH (ALL TIME)',
      'SPENT GRAPH (THIS MONTH)',
      'EARNED GRAPH (THIS MONTH)',
    ]

    const groupedGraphArrays = graphArrays.map((arr) =>
      groupArrayByCategory(arr)
    )
    const createdGraphs = groupedGraphArrays.map((arr) =>
      handleCreateGraph(arr)
    )
    const graphsWithTitles = createdGraphs.map((data, index) => ({
      title: graphTitles[index],
      data,
    }))

    setGraphs(graphsWithTitles)
  }, [transactions])

  return (
    <Container>
      <PageHeader title="Statistics" />
      <Content>
        {transactions.length === 0 ? (
          <NoTransactions text="To display the statistics you must add a transaction or an expense" />
        ) : (
          <Grid container>
            {graphs &&
              graphs.map(
                ({ title, data }) =>
                  data.datasets[0].data.length !== 0 && (
                    <Grid xs={12} sm={6} md={4} lg={3} item key={title}>
                      <Graph title={title} data={data} />
                    </Grid>
                  )
              )}
          </Grid>
        )}
      </Content>
    </Container>
  )
}

export default StatisticsPage
