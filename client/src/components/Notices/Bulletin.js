import React from 'react'
import './Legend.css'
import './LegendSymbols.css'
import NoticeItem from './NoticeItem'
import {Table} from 'reactstrap'
import ExternalLink from '../shared/ExternalLink'
import './Bulletin.css'

const Bulletin = ({items, number, year, date}) => (
  <div className="bulletin">
    <h3 className="bulletin-title">
      <strong>{date}</strong>
      <small>
        <span>Vestník číslo </span>
        <ExternalLink url={`https://www.uvo.gov.sk/evestnik?poradie=${number}&year=${year}`}>
          {number}/{year}
        </ExternalLink>
      </small>
    </h3>
    <Table responsive className="bulletin-table">
      <thead>
        <tr>
          <th />
          <th>Názov obstarávania</th>
          <th>Objednávateľ</th>
          <th>Kto by sa mal prihlásiť</th>
          <th className="text-right">Pod.</th>
        </tr>
      </thead>
      <tbody>{items.map((item) => <NoticeItem key={item.id} item={item} />)}</tbody>
    </Table>
  </div>
)

export default Bulletin
