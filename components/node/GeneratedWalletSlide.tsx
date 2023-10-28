import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import { Button, Divider, Snippet } from "@nextui-org/react";
import { Fragment } from "react";
import { NodeWithSigner } from "@/lib/types";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  node: NodeWithSigner;
}

export default function GeneratedWalletSlide({ open, setOpen, node }: Props) {
  const { signers } = node;
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-3xl pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-3xl">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <Button
                        onPress={() => setOpen(false)}
                        isIconOnly
                        variant="light"
                        className="relative rounded-md text-gray-100 hover:text-white focus:outline-none"
                      >
                        <AiOutlineClose size="25" />
                      </Button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-black py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <h2
                        className="text-base font-semibold leading-6 text-default-900"
                        id="slide-over-title"
                      >
                        Generated Wallet
                      </h2>
                      <p className="text-danger font-light italic mb-4">
                        Please use this wallet for testing purpose only
                      </p>
                    </div>
                    <Divider />
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {signers.map((signer, index) => {
                        return (
                          <div
                            key={index}
                            className="grid grid-cols-12 w-full gap-2 mb-6"
                          >
                            <div className="col-span-1 text-default-500 self-center">
                              {index + 1}
                            </div>
                            <Snippet
                              className="col-span-5"
                              hideSymbol
                              size="sm"
                              classNames={{
                                pre: "text-ellipsis overflow-hidden",
                              }}
                            >
                              {signer.address}
                            </Snippet>
                            <Snippet
                              className="col-span-6"
                              hideSymbol
                              size="sm"
                              classNames={{
                                pre: "text-ellipsis overflow-hidden",
                              }}
                            >
                              {signer.privateKey}
                            </Snippet>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
