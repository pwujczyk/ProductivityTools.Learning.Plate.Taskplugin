import { createPlugins, Plate, RenderAfterEditable } from '@udecode/plate-common';
import { createLinkPlugin, ELEMENT_LINK } from '@udecode/plate-link';
import { createNodeIdPlugin } from '@udecode/plate-node-id';

import { LinkElement } from '@/components/plate-ui/link-element';
import { LinkFloatingToolbar } from '@/components/plate-ui/link-floating-toolbar';
import { Editor } from '@/components/plate-ui/editor';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
const plugins = createPlugins(
  [
    createLinkPlugin({
      renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
    }),
    createNodeIdPlugin(),
  ],
  {
    components: {
      [ELEMENT_LINK]: LinkElement,
    },
  }
);
 
const initialValue = [
  {
    id: '1',
    type: 'p',
    children: [{ text: 'Hello, World!' }],
  },
];

export function BasicEditor() {
  return (
    <Plate plugins={plugins} initialValue={initialValue}>
      <FixedToolbar>
        <FixedToolbarButtons />
      </FixedToolbar>
      
      <Editor />
    </Plate>
  );
}