import { Menu } from '@headlessui/react'
import React, { PropsWithChildren } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface DropDownType {
  buttonText: string,
  position: "right" | "left"
}

const DropDown: React.FC<PropsWithChildren<DropDownType>> = (props) => {
  const { children, buttonText, position } = props
  return (
    <Menu as="div" className="relative inline-block text-left text-indigo-500">
      <div>
        <Menu.Button className="inline-flex justify-center btn-small btn-primary-inverted mr-1">
          { buttonText }
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Menu.Items className={`absolute ${position}-0 mt-2 w-56 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-100`}>
      { children }
      </Menu.Items>
    </Menu>
  )
}

export default DropDown
