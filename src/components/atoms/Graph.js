import React from 'react'
import PropTypes from 'prop-types';
import { styled } from '@mui/styles';

import { Doughnut } from 'react-chartjs-2';

import Card from '@Components/atoms/Card';

const GraphCard = styled(Card)({
    margin: '0.5rem'
})

const Graph = ({ title, data }) => {
    return (
        <GraphCard title={title}>
            <Doughnut data={data} />
        </GraphCard>
    )
}

Graph.propTypes = {
    title: PropTypes.string,
    data: PropTypes.object,
}

export default Graph
