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


    let { props: linkProps } = useLink({ element });
    linkProps = { ...linkProps, target: undefined }

    //{"type":"a","url":"https://github.com/udecode/plate/discussions/1344","children":[{"text":"World"}]},
    const editor = useEditorRef();
    const path = findNodePath(editor, element);
    setNodes(
      editor,
      { url: 'http://prodictivitytools/' },
      {
        at: path,
      }
    );

    console.log("Linkprops in task", linkProps)
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
          <span>{element.url}</span>
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
        <PlateElement
          ref={ref}
          asChild
          className={cn(
            'font-medium text-primary underline decoration-primary underline-offset-4',
            className
          )}
          {...(linkProps as any)}
          {...props}
        >
          <a>{children}</a>
        </PlateElement>
      </div>
    );
  }
);
