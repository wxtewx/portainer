import { PropsWithChildren, createContext, useContext } from 'react';
import clsx from 'clsx';

import styles from './HeaderContainer.module.css';

const Context = createContext<null | boolean>(null);
Context.displayName = 'PageHeaderContext';

export function useHeaderContext() {
  const context = useContext(Context);

  if (context == null) {
    throw new Error('必须嵌套在 HeaderContainer 组件内部');
  }
}
interface Props {
  id?: string;
}

export function HeaderContainer({ id, children }: PropsWithChildren<Props>) {
  return (
    <Context.Provider value>
      <div id={id} className={clsx('row', styles.header)}>
        <div id="loadingbar-placeholder" />
        <div className="col-xs-12">
          <div className={styles.meta}>{children}</div>
        </div>
      </div>
    </Context.Provider>
  );
}
