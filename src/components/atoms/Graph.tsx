import React from 'react'
import { styled } from '@mui/styles'

import { Doughnut } from 'react-chartjs-2'

import Card from '@Components/atoms/Card'
import { IGraph } from '@/types'

const GraphCard = styled(Card)({
  margin: '0.5rem',
})

const Graph: React.FC<IGraph> = ({ title, data }) => {
  return (
    <GraphCard title={title}>
      <Doughnut data={data} />
    </GraphCard>
  )
}

export default Graph
