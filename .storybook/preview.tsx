import type { Preview } from '@storybook/react-vite';
import { ThemeProvider, useTheme } from 'next-themes';
import React, { useEffect } from 'react';
import '../src/index.css';

// Syncs storybook toolbar selection → next-themes
const ThemeSync = ({ theme }: { theme: string }) => {
  const { setTheme } = useTheme();
  useEffect(() => setTheme(theme), [theme, setTheme]);
  return null;
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'system', title: 'System', icon: 'browser' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'system',
  },
  decorators: [
    (Story, context) => (
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <ThemeSync theme={context.globals.theme} />
        <div className='relative h-screen w-full bg-primary bg-grid-black/2 dark:bg-grid-white/2 flex items-center justify-center'>
          <div className='absolute pointer-events-none inset-0 z-1 bg-white dark:bg-black mask-[radial-gradient(ellipse_80%_80%_at_center,transparent_70%,black)]' />
          <div className='relative z-2 w-full h-full flex items-center justify-center p-8'>
            <Story />
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      showPanel: false,
      storySort: {
        order: ['Assets', 'Buttons', 'Components', 'Primitives'],
      },
    },
  },
};

export default preview;
