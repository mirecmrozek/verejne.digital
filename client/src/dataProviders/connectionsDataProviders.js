// @flow
import type {Dispatch} from '../types/reduxTypes'
import {receiveData} from '../actions/sharedActions'

const dispatchEntitiesData = (query: string) => (ref: string, data: any, dispatch: Dispatch) => {
  dispatch(
    receiveData(['connections', 'entities'], {id: query, eids: data.map(({eid}) => eid)}, ref)
  )
}

const dispatchConnectionData = (eid1: string, eid2: string) => (
  ref: string,
  data: any,
  dispatch: Dispatch
) => {
  dispatch(receiveData(['connections', 'detail'], {id: `${eid1}-${eid2}`, ids: data}, ref))
}

const dispatchEntityDetailData = (eid: string) => (ref: string, data: any, dispatch: Dispatch) => {
  dispatch(
    receiveData(
      ['connections', 'entityDetails'],
      {id: eid, name: data.entities[0].entity_name, data},
      ref
    )
  )
}

const dispatchSubgraphData = (eid1: string, eid2: string, transformer: (Object) => Object) => (
  ref: string,
  data: any,
  dispatch: Dispatch
) => {
  dispatch(
    receiveData(['connections', 'subgraph'], {id: `${eid1}-${eid2}`, data: transformer(data)}, ref)
  )
}

export const connectionEntityProvider = (query: string) => ({
  ref: `connectionEntities-${query}`,
  getData: [
    fetch,
    `${process.env.REACT_APP_API_URL || ''}/api/v/searchEntity?text=${query}`,
    {
      accept: 'application/json',
    },
  ],
  onData: [dispatchEntitiesData, query],
  keepAliveFor: 10 * 60 * 1000,
})

export const connectionEntityDetailProvider = (eid: string) => ({
  ref: `connectionEntityDetail-${eid}`,
  getData: [
    fetch,
    `${process.env.REACT_APP_API_URL || ''}/api/v/getInfo?eid=${eid}`,
    {
      accept: 'application/json',
    },
  ],
  onData: [dispatchEntityDetailData, eid],
  keepAliveFor: 10 * 60 * 1000,
})

export const connectionDetailProvider = (eid1: string, eid2: string) => ({
  ref: `connection-${eid1}-${eid2}`,
  getData: [
    fetch,
    `${process.env.REACT_APP_API_URL || ''}/api/p/connection?eid1=${eid1}&eid2=${eid2}`,
    {
      accept: 'application/json',
    },
  ],
  onData: [dispatchConnectionData, eid1, eid2],
  keepAliveFor: 60 * 60 * 1000,
})

export const connectionSubgraphProvider = (
  eid1: string,
  eid2: string,
  transformer: (Object) => Object
) => ({
  ref: `connextion-${eid1}-${eid2}`,
  getData: [
    fetch,
    `${process.env.REACT_APP_API_URL || ''}/api/p/subgraph?eid1=${eid1}&eid2=${eid2}`,
    {
      accept: 'application/json',
    },
  ],
  onData: [dispatchSubgraphData, eid1, eid2, transformer],
  keepAliveFor: 1, //60 * 60 * 1000,
})
