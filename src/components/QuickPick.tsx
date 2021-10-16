import {
  useState,
  useRef,
  createContext,
  ReactNode,
  CSSProperties,
  ChangeEventHandler,
  MouseEventHandler,
} from 'react';
import ReactModal from 'react-modal';

import {
  useQuickPickLogic,
} from '../hooks/use-quick-pick-logic';

import type {
  QuickPickItem,
  HasName,
} from '../hooks/use-quick-pick-logic';

import {
  TextFilter,
} from '../text-filters';

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
    height: '80%',
    overflow: 'hidden',
    padding: '3px',
    boxSizing: 'border-box',
  } as CSSProperties,
};

const titleStyle: CSSProperties = {
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

const listStyle: CSSProperties = {
  width: '100%',
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  color: '#333',
};

const listItemStyle: CSSProperties = {
  width: '100%',
  padding: 0,
  margin: 0,
  borderBottom: '1px solid #aaa',
  boxSizing: 'border-box',
  color: '#333',
};

interface QuickPickPresentationalProps<Content extends HasName> {
  title: string;
  placeHolder: string;
  isOpen: boolean;
  selectedIndex: number;
  items: QuickPickItem<Content>[];
  onClose: () => unknown;
  onTextChange: ChangeEventHandler<HTMLInputElement>;
  onMouseDownOutside: MouseEventHandler<HTMLDivElement>;
  renderItem: (
    item: QuickPickItem<Content>,
    isSelected: boolean,
  ) => ReactNode;
  parentSelector?: () => HTMLElement;
}

const QuickPickPresentational = <Item extends HasName>({
  title,
  placeHolder,
  isOpen,
  items,
  selectedIndex,
  onClose,
  onTextChange,
  onMouseDownOutside,
  renderItem,
  parentSelector,
}: QuickPickPresentationalProps<Item>) => {
  return (
    <div onMouseDown={onMouseDownOutside} >
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={modalStyles}
        contentLabel="Command Palette"
        parentSelector={parentSelector}
      >
        {
          title &&
          <div style={titleStyle}>{ title }</div>
        }
        <input
          autoFocus
          onChange={onTextChange}
          type='text'
          placeholder={placeHolder}
          style={inputStyle}
        ></input>
        <ul style={listStyle}>
          {
            items
              .map((item, idx) => (
                <li
                  key={`${item.name}`}
                  style={listItemStyle}
                >
                  {renderItem(item, idx === selectedIndex)}
                </li>
              ))
          }
        </ul>
      </ReactModal>
    </div>
  );
};

interface QuickPickOptions {
  placeHolder?: string;
  title?: string;
}

interface QuickPickGlobals<Item extends HasName> {
  isOpen: boolean;
  showQuickPick: (items: Item[], options?: QuickPickOptions) => Promise<Item | null>;
  cancelQuickPick: () => void;
  selectItemQuickPick: () => void;
  nextItemQuickPick: () => void;
  previousItemQuickPick: () => void;
}

const QUICK_PICK_COMMANDS = [
  'cancelQuickPick',
  'selectItemQuickPick',
  'nextItemQuickPick',
  'previousItemQuickPick',
] as const;

type QuickPickAllCommandList = typeof QUICK_PICK_COMMANDS;
type QuickPickCommand = QuickPickAllCommandList[number];

const quickPickKeybindings: Record<QuickPickCommand, Keys> = {
  cancelQuickPick: 'esc',
  selectItemQuickPick: 'enter',
  nextItemQuickPick: 'down',
  previousItemQuickPick: 'up',
};

type QuickPickCallbacks = Record<QuickPickCommand, () => unknown>;

const createQuickPickContext = <Item extends HasName>({
  renderItem,
  textFilter,
}: {
  renderItem: (item: QuickPickItem<Item>, isSelected: boolean) => ReactNode,
  textFilter: TextFilter,
}) => {
  const QuickPickContext = createContext<QuickPickGlobals<Item>>({
    isOpen: false,
    showQuickPick: () => { throw Error('QuickPickGlobals is not initialized yet') },
    cancelQuickPick: () => { throw Error('QuickPickGlobals is not initialized yet') },
    selectItemQuickPick: () => { throw Error('QuickPickGlobals is not initialized yet') },
    nextItemQuickPick: () => { throw Error('QuickPickGlobals is not initialized yet') },
    previousItemQuickPick: () => { throw Error('QuickPickGlobals is not initialized yet') },
  });

  const QuickPickProvider = ({
    parentSelector,
    modalAppElement = '#root',
    children
  }: {
    parentSelector?: () => HTMLElement;
    modalAppElement?: string | HTMLElement;
    children: ReactNode;
  }) => {
    ReactModal.setAppElement(modalAppElement);
    const deferredRef = useRef<Deferred<Item | null> | null>(null);
    const [items, setItems] = useState<Item[]>([]);
    const [placeHolder, setPlaceHolder] = useState('');
    const [title, setTitle] = useState('');

    const {
      isOpen,
      open,
      close,
      // toggle,
      nextItem,
      previousItem,
      select,
      chanegeInputText,
      matchedItems,
      selectedIndex,
    } = useQuickPickLogic<Item>({items, textFilter});

    const onTextChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      chanegeInputText(event.target.value);
    };

    const showQuickPick = (items: Item[], options?: QuickPickOptions): Promise<Item | null> => {
      const {
        placeHolder = '',
        title = '',
      } = options || {};

      setPlaceHolder(placeHolder);
      setTitle(title);

      setItems(items);
      const deferred = new Deferred<Item | null>();
      deferredRef.current = deferred;
      open();
      return deferred.promise;
    };

    const cancelQuickPick = () => {
      close();
      deferredRef.current?.resolve(null);
    };

    const selectItemQuickPick = () => {
      const item = select();
      deferredRef.current?.resolve(item);
    };

    const callbacks: QuickPickCallbacks = {
      cancelQuickPick,
      selectItemQuickPick,
      nextItemQuickPick: nextItem,
      previousItemQuickPick: previousItem,
    };

    // keybindings
    useKeybindings({
      keybindings: quickPickKeybindings,
      commandCallbacks: callbacks,
      commands: QUICK_PICK_COMMANDS,
      bindGlobal: true,
      enabled: isOpen,
    });

    const quickPickGlobals: QuickPickGlobals<Item> = {
      isOpen,
      showQuickPick,
      ...callbacks,
    };

    return (
      <QuickPickContext.Provider
        value={quickPickGlobals}
      >
        {
          isOpen &&
          <QuickPickPresentational
            title={title}
            placeHolder={placeHolder}
            isOpen={isOpen}
            items={matchedItems}
            selectedIndex={selectedIndex}
            onClose={cancelQuickPick}
            onTextChange={onTextChange}
            onMouseDownOutside={cancelQuickPick}
            renderItem={renderItem}
            parentSelector={parentSelector}
          />
        }
        {children}
      </QuickPickContext.Provider>
    );
  };

  return {
    QuickPickContext,
    QuickPickProvider,
  };
};

export {
  createQuickPickContext,
};
