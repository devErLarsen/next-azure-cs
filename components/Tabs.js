import { Tab } from '@headlessui/react'

export default function Tabs({ output }) {
    return (
        <div className="w-full max-w-md px-2 py-16 sm:px-0">
            <Tab.Group>
                <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
                    <Tab>Sentiment</Tab>
                    <Tab>Key Phrases</Tab>
                    <Tab>Translations</Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        {output.sentiment}
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}