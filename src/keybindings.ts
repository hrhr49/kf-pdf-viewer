import {
  COMMANDS,
} from './commands';

import type {
  Command,
} from './commands';

import {
  Validator,
} from 'jsonschema';

type Keys = string | string[] | null;
// type Keybindings = Partial<Record<Command, Keys>>;
type Keybindings = Record<Command, Keys>;

const createKeybindingsJsonSchema = () => {
  const keysJsonSchema = {
    "anyOf": [
      {
        "type": "null"
      },
      {
        "type": "string"
      },
      {
        "type": "array",
        "items": [
          {
            "type": "string"
          },
          {
            "type": "string"
          }
        ]
      },
    ],
  };
  const base: any = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "additionalProperties": false,
    "properties": {
    },
    "required": [
    ],
  };
  COMMANDS.forEach((command: Command) => {
    base.properties[command] = keysJsonSchema;
    // partial keybindings is OK for now.
    // base.required.push(command);
  });
  return base;
};

const keybindingsJsonSchema = createKeybindingsJsonSchema();
const keybindingsJsonSchemaValidator = new Validator();

// const isKeys = (obj: any): obj is Keys => {
//   return (
//     (obj === null)
//     || (typeof obj === 'string')
//     || (
//       (typeof obj === 'object') 
//       && (obj instanceof Array)
//       && obj.every((s) => (typeof s === 'string'))
//     )
//   );
// };

// const isKeybindings = (obj: any): obj is Keybindings => {
//   return (
//     (typeof obj === 'object')
//     && (obj !== null)
//     && COMMANDS.every((command) => isKeys(obj[command]))
//   );
// };

const isPartialKeybindings = (obj: any): obj is Partial<Keybindings> => {
  const result = keybindingsJsonSchemaValidator.validate(obj, keybindingsJsonSchema);
  if (result.valid) {
    return true;
  } else {
    throw result.errors;
  }

  // return (
  //   (typeof obj === 'object')
  //   && (obj !== null)
  //   && Object.keys(obj).every((key) => isCommand(key) && isKeys(obj[key]))
  // );
};

const defaultKeybindings: Keybindings = {
  doNothing: null,

  fullScreenOn: null,
  fullScreenOff: null,
  fullScreenToggle: 'f',

  showInfoOn: null,
  showInfoOff: null,
  showInfoToggle: 'i',

  scaleUp: '+',
  scaleDown: '-',
  scaleDefault: '=',

  commandPaletteOpen: ['command+shift+p', 'ctrl+shift+p'],
  loadUrl: ['command+shift+u', 'ctrl+shift+u'],
};

export {
  defaultKeybindings,
  isPartialKeybindings,
};

export type {
  Keys,
  Keybindings,
}
