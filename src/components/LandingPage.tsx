import {CSSProperties, FC} from 'react';
import {Keyboard} from './Keyboard';

import {
  COMMANDS,
  commandToTitle,
} from '../commands';
import type {
  Keybindings
} from '../keybindings';

const landingPageStyle: CSSProperties = {
  padding: '0px 40px',
  background: 'white',
  width: '100%',
  height: '100%',
  overflow: 'scroll',
};

const tableStyle: CSSProperties = {
  borderCollapse: 'collapse',
  // border: '#ddd',
};

const theadStyle: CSSProperties = {
  backgroundColor: '#777',
  color: '#eee',
  border: '1px solid #ddd',
  padding: '4px',
};

const thStyle: CSSProperties = {
  padding: '4px',
};

const trStyle: CSSProperties = {
  padding: '4px',
};

const tdStyle: CSSProperties = {
  padding: '4px',
};

interface LandingPageProps {
  keybindings: Keybindings;
}

const LandingPage: FC<LandingPageProps> = ({
  keybindings,
}) => (
  <div
    style={landingPageStyle}
  >
    <h3>How to Use</h3>
    <ul>
      <li>command palette: <Keyboard keys={keybindings.commandPaletteOpen} /></li>
      <li>open file:
        <ul>
          <li>drag and drop PDF file here.</li>
          <li>keyboard shortcuts: <Keyboard keys={keybindings.fileOpen} /></li>
          <li>choose 'File Open' command in command palette</li>
        </ul>
      </li>
    </ul>

    <h3>Keybindings</h3>
    <table style={tableStyle} >
      <thead style={theadStyle} >
        <tr>
          <th style={thStyle} >command</th>
          <th style={thStyle} >keybord shortcuts</th>
        </tr>
      </thead>
      <tbody>
        {
          COMMANDS.map((command, idx) => (
            <tr
              key={command}
              style={{
                ...trStyle,
                backgroundColor: idx % 2 === 0 ? '#eee' : '#fff',
              }} 
            >
              <td style={tdStyle} >{commandToTitle(command)}</td>
              <td style={tdStyle} ><Keyboard keys={keybindings[command]} /></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

export {
  LandingPage,
}
