import {
  useState,
  useCallback,
  useRef,
  createContext,
  ReactNode,
  CSSProperties,
  ChangeEventHandler,
  MouseEventHandler,
} from 'react';
import ReactModal from 'react-modal';

import {
  useFlag
} from '../hooks/use-flag';

import {
  Deferred,
} from '../deferred';

import {
  useKeybindings,
} from '../hooks/use-keybindings';
import type {
  Keys,
} from '../keybindings';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '20%',
    overflow: 'hidden',
    padding: '3px',
    boxSizing: 'border-box',
  } as CSSProperties,
};

const promptStyle: CSSProperties = {
  margin: 0,
  padding: '2px 8px',
  boxSizing: 'border-box',
  color: '#333',
};

const inputStyle: CSSProperties = {
  width: '100%',
  margin: 0,
  padding: '4px 8px',
  // padding: 0,
  fontSize: '1.2em',
  boxSizing: 'border-box',
  border: 'solid 2px orange',
  color: '#333',
};

interface InputBoxPresentationalProps {
  prompt: string;
  placeHolder: string;
  isOpen: boolean;
  onClose: () => unknown;
  onTextChange: ChangeEventHandler<HTMLInputElement>;
  onMouseDownOutside: MouseEventHandler<HTMLDivElement>;
  parentSelector?: () => HTMLElement;
}

const InputBoxPresentational = ({
  prompt,
  placeHolder,
  isOpen,
  onClose,
  onTextChange,
  onMouseDownOutside,
  parentSelector,
}: InputBoxPresentationalProps) => {
  return (
    <div onMouseDown={onMouseDownOutside} >
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={modalStyles}
        contentLabel="Input Box"
        parentSelector={parentSelector}
      >
        <input
          autoFocus
          onChange={onTextChange}
          type='text'
          placeholder={placeHolder}
          style={inputStyle}
        ></input>
        {
          prompt &&
          <div style={promptStyle}>{ prompt }</div>
        }
      </ReactModal>
    </div>
  );
};

interface InputBoxOptions {
  // title?: string;
  prompt?: string;
  placeHolder?: string;
}

interface InputBoxGlobals {
  isOpen: boolean;
  showInputBox: (options?: InputBoxOptions) => Promise<string | null>;
  cancelInputBox: () => void;
  confirmInputBox: () => void;
}

const INPUT_BOX_COMMANDS = [
  'cancelInputBox',
  'confirmInputBox',
] as const;

type InputBoxAllCommandList = typeof INPUT_BOX_COMMANDS;
type InputBoxCommand = InputBoxAllCommandList[number];

const inputBoxKeybindings: Record<InputBoxCommand, Keys> = {
  cancelInputBox: 'esc',
  confirmInputBox: 'enter',
};

const createInputBoxContext = () => {
  const InputBoxContext = createContext<InputBoxGlobals>({
    isOpen: false,
    showInputBox: () => { throw Error('InputBoxGlobals is not initialized yet') },
    cancelInputBox: () => { throw Error('InputBoxGlobals is not initialized yet') },
    confirmInputBox: () => { throw Error('InputBoxGlobals is not initialized yet') },
  });

  const InputBoxProvider = ({
    parentSelector,
    modalAppElement = '#root',
    children,
  }: {
    parentSelector?: () => HTMLElement;
    modalAppElement?: string | HTMLElement;
    children: ReactNode;
  }) => {
    ReactModal.setAppElement(modalAppElement);

    const deferredRef = useRef<Deferred<string | null> | null>(null);
    const [placeHolder, setPlaceHolder] = useState('');
    const [prompt, setPrompt] = useState('');
    const [inputText, setInputText] = useState('');

    const [
      isOpen,
      {
        on: isOpenOn,
        off: isOpenOff,
      }
    ] = useFlag(false);

    const open = useCallback(() => {
      isOpenOn();
      setInputText('');
    }, [isOpenOn]);

    const close = useCallback(() => {
      isOpenOff();
    }, [isOpenOff]);

    const onTextChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
      setInputText(event.target.value);
    }, []);

    const showInputBox = (options?: InputBoxOptions): Promise<string | null> => {
      const {
        placeHolder = '',
        prompt = '',
      } = options || {};

      setPlaceHolder(placeHolder);
      setPrompt(prompt);

      const deferred = new Deferred<string | null>();
      deferredRef.current = deferred;
      open();
      return deferred.promise;
    };

    const cancelInputBox = () => {
      close();
      deferredRef.current?.resolve(null);
    };

    const confirmInputBox = () => {
      close();
      deferredRef.current?.resolve(inputText);
    };

    const callbacks = {
      cancelInputBox,
      confirmInputBox,
    };

    useKeybindings({
      keybindings: inputBoxKeybindings,
      commandCallbacks: callbacks,
      commands: INPUT_BOX_COMMANDS,
      bindGlobal: true,
      enabled: isOpen,
    });

    const inputBoxGlobals: InputBoxGlobals = {
      isOpen,
      showInputBox,
      cancelInputBox,
      confirmInputBox,
    };

    return (
      <InputBoxContext.Provider
        value={inputBoxGlobals}
      >
        {
          isOpen &&
          <InputBoxPresentational
            prompt={prompt}
            placeHolder={placeHolder}
            isOpen={isOpen}
            onClose={cancelInputBox}
            onTextChange={onTextChange}
            onMouseDownOutside={cancelInputBox}
            parentSelector={parentSelector}
          />
        }
        {children}
      </InputBoxContext.Provider>
    );
  };

  return {
    InputBoxContext,
    InputBoxProvider,
  };
};


const {
  InputBoxContext,
  InputBoxProvider,
} = createInputBoxContext();

export {
  InputBoxContext,
  InputBoxProvider,
};
