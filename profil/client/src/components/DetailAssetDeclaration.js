import React from 'react';
import './DetailAssetDeclaration.css';


const DetailAssetDeclaration = ({assets, year, title, source}) => (  
<table className="assets-declaration table">
  <thead>
    <tr>
      <th></th>
      <th>
        {title} ({assets.length}) <br/>
        <span className="assets-declaration source">zdroj </span>
        <a href={source} target="_BLANK">NRSR <i className="fa fa-external-link" aria-hidden="true"></i></a>
        <span className="assets-declaration source">{(year !== 0 ? 'rok ' + year : '')}</span>
      </th>
    </tr>    
  </thead>
  <tbody>
    {assets.map((asset, key) =>
      <tr key={key}>
        <td className="key">{key < 9 ? "0" + (key + 1) : (key + 1)}</td>
        <td>
          {asset}
        </td>
      </tr>
    )}    
  </tbody>
</table>
);
export default DetailAssetDeclaration;