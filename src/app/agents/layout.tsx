"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { BiQuestionMark, BiWater } from "react-icons/bi";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  // {
  //   name: "Completion Agent",
  //   href: "/agents/completion",
  //   icon: BiChat,
  // },
  {
    name: "Agent without R.A.G.",
    href: "/agents/no-rag",
    icon: BiWater,
  },
  // {
  //   name: "Streaming Agent w/ Memory",
  //   href: "/agents/streaming-with-memory",
  //   icon: BiMemoryCard,
  // },
  {
    name: "Agent with R.A.G.",
    href: "/agents/rag",
    icon: BiQuestionMark,
  },
  // {
  //   name: "ReAct Agent",
  //   href: "/agents/react",
  //   icon: BiBrain,
  // },
  // {
  //   name: "Next Level",
  //   href: "/agents/next-level",
  //   icon: BiRocket,
  // },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const segments = pathname.split("/");
  const current = segments[segments.length - 1];

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-blue-600 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center"></div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.href.split("/")[
                                      item.href.split("/").length - 1
                                    ] === current
                                      ? "bg-blue-700 text-white"
                                      : "text-blue-200 hover:text-white hover:bg-blue-700",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.href.split("/")[
                                        item.href.split("/").length - 1
                                      ] === current
                                        ? "text-white"
                                        : "text-blue-200 group-hover:text-white",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-blue-600 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <Link href={"/"}>
                <span className="text-white cursor-pointer">CMD</span>
              </Link>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.href.split("/")[
                              item.href.split("/").length - 1
                            ] === current
                              ? "bg-blue-700 text-white"
                              : "text-blue-200 hover:text-white hover:bg-blue-700",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.href.split("/")[
                                item.href.split("/").length - 1
                              ] === current
                                ? "text-white"
                                : "text-blue-200 group-hover:text-white",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
