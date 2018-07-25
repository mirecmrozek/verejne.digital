// @flow
import React from 'react'
import {compose} from 'redux'
import {branch, renderComponent} from 'recompose'
import ConnectionWrapper from '../../dataWrappers/ConnectionWrapper'
import EntityWrapper from '../../dataWrappers/EntityWrapper'
import EntitySearchWrapper from '../../dataWrappers/EntitySearchWrapper'
import InfoLoader from './components/InfoLoader/InfoLoader'
import BeforeResults from './components/BeforeResults/BeforeResults'
import Subgraph from './components/Subgraph/Subgraph'

const Results = (props) => (
  <div>
    {props.showGraph ? <Subgraph preloadNodes {...props} /> : ''}
    {props.connections.map((connEid) => <InfoLoader key={connEid} eid={connEid} hasConnectLine />)}
  </div>
)

export default compose(
  EntitySearchWrapper,
  branch(
    ({entitySearch1, entitySearch2}) => entitySearch1 && entitySearch2,
    compose(EntityWrapper, ConnectionWrapper),
    renderComponent(BeforeResults)
  )
)(Results)
