import React from 'react';
import { cn, withRef } from '@udecode/cn';
import { PlateElement, useElement, findNodePath, useEditorRef, setNodes } from '@udecode/plate-common';
import { LinkElement } from '@/components/plate-ui/link-element'
import {
  useTodoListElement,
  useTodoListElementState,
} from '@udecode/plate-list';

import { Checkbox } from './checkbox';
import { TLinkElement, useLink } from '@udecode/plate-link';


export const TodoListElement = withRef<typeof PlateElement>(
  ({ className, children, ...props }, ref) => {
    const element = useElement<TLinkElement>();
    const state = useTodoListElementState({ element });
    const { checkboxProps } = useTodoListElement(state);

   
    const { props: linkProps } = useLink({ element });

//{"type":"a","url":"https://github.com/udecode/plate/discussions/1344","children":[{"text":"World"}]},
    const editor = useEditorRef();
    const path = findNodePath(editor, element);
    setNodes(
      editor,
      { url: '{"type":"a"}' },
      {
        at: path,
      }
    );

    console.log(props);
    console.log(state);
    console.log("XXXX")
    return (
      <div>
        <PlateElement
          ref={ref}
          className={cn('flex flex-row py-1', className)}
          {...props}
        >
          <div
            className="mr-1.5 flex select-none items-center justify-center"
            contentEditable={false}
          >
            <Checkbox {...checkboxProps} />
          </div>
          <span
            className={cn(
              'flex-1 focus:outline-none',
              state.checked && 'text-muted-foreground line-through'
            )}
            contentEditable={!state.readOnly}
            suppressContentEditableWarning
          >
            {children}
          </span>
        </PlateElement >
      </div>  
    );
  }
);
