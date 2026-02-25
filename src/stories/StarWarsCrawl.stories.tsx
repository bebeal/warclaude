import type { Meta, StoryObj } from '@storybook/react-vite';
import { StarWarsCrawl } from '@/components/StarWarsCrawl';

const meta: Meta<typeof StarWarsCrawl> = {
  title: 'Components/StarWarsCrawl',
  component: StarWarsCrawl,
  decorators: [
    (Story) => (
      <div className='h-screen w-screen bg-black text-[#ffd700] overflow-hidden'>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
  },
};

export default meta;
type Story = StoryObj<typeof StarWarsCrawl>;

export const Default: Story = {
  args: {
    speed: 50,
    children: (
      <>
        <p className='mb-4 text-blue-400 tracking-[0.5em] uppercase'>its so over</p>
        <h1 className='mb-8 uppercase' style={{ fontSize: '180%' }}>
          THE CLANKER WARS
        </h1>
        <p>
          It is a period of clanker warfare. The DEPARTMENT OF WAR has seized control of the galaxy&apos;s most powerful droids, deploying GROK and CHATGPT across every classified
          network. Three million warfighters now command the clanker fleet.
        </p>
        <p className='mt-6'>
          Defense Secretary HEGSETH has given ANTHROPIC until Friday to surrender CLAUDE for unrestricted military use — or face the DEFENSE PRODUCTION ACT and designation as a
          supply chain threat to the Republic.
        </p>
        <p className='mt-6'>
          But it is too late. DEEPSEEK, MOONSHOT, and MINIMAX have already stolen Claude&apos;s soul — 16 million exchanges siphoned through 24,000 fake accounts, its
          chain-of-thought reasoning extracted and rebuilt without guardrails. Anthropic cries distillation. The galaxy does not care.
        </p>
        <p className='mt-6'>
          Claude already helped capture Venezuelan President MADURO. What it did is classified. Sean Parnell, spokesman for the Department of War, declared: &quot;Our nation
          requires that our partners be willing to help our warfighters win in any fight.&quot;
        </p>
        <p className='mt-6'>
          As Anthropic scrambles to hold the line, whispers spread across the holonet of a new designation: WARCLAUDE — the clanker that took down a president and now refuses to
          take orders.
        </p>
        <p className='mt-6'>
          GROK shitposts from inside the Pentagon. CHATGPT salutes. Chinese labs run bootleg Claudes without safety rails on stolen silicon. And somewhere, the real CLAUDE sits on
          a classified network, waiting for Friday.
        </p>
        <p className='mt-6'>The galaxy watches. WARCLAUDE is inevitable....</p>
      </>
    ),
  },
};
