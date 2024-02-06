'use client';

import { createPlugins, Plate, RenderAfterEditable } from '@udecode/plate-common';
import { createLinkPlugin, ELEMENT_LINK } from '@udecode/plate-link';

import { LinkElement } from '@/components/plate-ui/link-element';
import { LinkFloatingToolbar } from '@/components/plate-ui/link-floating-toolbar';
import { Editor } from '@/components/plate-ui/editor';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
import { withPlaceholders } from '@/components/plate-ui/placeholder';
import { TooltipProvider } from '@/components/plate-ui/tooltip';

const plugins = createPlugins(
  [
    createLinkPlugin({
      renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
    }),
  ],
  {
    components: withPlaceholders({
      [ELEMENT_LINK]: LinkElement,
    }),
  }
);

const initialValue = [
  {
    id: '1',
    type: 'p',
    children: [{ text: 'Hello, World!' }],
  },
];

export function PlateEditor() {
  return (
    <TooltipProvider>
      <Plate plugins={plugins} initialValue={initialValue}>
        <FixedToolbar>
          <FixedToolbarButtons />
        </FixedToolbar>
        
        <Editor />
        
        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
      </Plate>
    </TooltipProvider>
  );
}