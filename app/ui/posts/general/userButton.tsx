import { UserCircleIcon } from '@heroicons/react/24/outline';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { authenticate, signOutAction } from '@/app/lib/actions';
import { Session } from 'next-auth';
import { Avatar } from '@nextui-org/react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';

export function UserButton({
  locale,
  session,
}: {
  locale: string;
  session?: Session;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Dropdown className="flex-none">
        <DropdownTrigger>
          <button className="my-2 mr-4 flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors focus:outline-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
            {session?.user && session.user?.image ? (
              <Avatar src={session.user.image} />
            ) : (
              <UserCircleIcon className="h-8 w-8 text-gray-500 hover:text-orange-500" />
            )}
          </button>
        </DropdownTrigger>
        <DropdownMenu
          className="max-h-96 overflow-y-auto rounded-lg bg-white"
          aria-label="Static Actions"
          onAction={(key) => {
            const actionKey = key.toString();
            if (actionKey === 'SignIn') {
              // authenticate(locale);
              onOpen();
            }
            if (actionKey === 'SignOut') {
              signOutAction(locale);
            }
          }}
        >
          {session?.user ? (
            <DropdownItem className="hover:bg-gray-100" key="SignOut">
              Sign out
            </DropdownItem>
          ) : (
            <DropdownItem className="hover:bg-gray-100" key="SignIn">
              Sign in
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        className="rounded-lg bg-white  "
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="mt-6 flex flex-col gap-1 text-center text-xl">
                Sign in to Key Blog
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col justify-between px-1 py-2">
                  <Button
                    color="primary"
                    variant="flat"
                    className="mb-4 flex w-full rounded-lg outline-gray-300 hover:bg-gray-100"
                    onClick={() => {
                      authenticate(locale);
                      onClose();
                    }}
                  >
                    <span className="">
                      <svg viewBox="0 0 533.5 544.3" height="18" width="18">
                        <title>google-colored</title>
                        <path
                          d="M533.5,278.4a320.07,320.07,0,0,0-4.7-55.3H272.1V327.9h147a126,126,0,0,1-54.4,82.7v68h87.7C503.9,431.2,533.5,361.2,533.5,278.4Z"
                          fill="#4285f4"
                        ></path>
                        <path
                          d="M272.1,544.3c73.4,0,135.3-24.1,180.4-65.7l-87.7-68c-24.4,16.6-55.9,26-92.6,26-71,0-131.2-47.9-152.8-112.3H28.9v70.1A272.19,272.19,0,0,0,272.1,544.3Z"
                          fill="#34a853"
                        ></path>
                        <path
                          d="M119.3,324.3a163,163,0,0,1,0-104.2V150H28.9a272.38,272.38,0,0,0,0,244.4Z"
                          fill="#fbbc04"
                        ></path>
                        <path
                          d="M272.1,107.7a147.89,147.89,0,0,1,104.4,40.8h0l77.7-77.7A261.56,261.56,0,0,0,272.1,0,272.1,272.1,0,0,0,28.9,150l90.4,70.1C140.8,155.6,201.1,107.7,272.1,107.7Z"
                          fill="#ea4335"
                        ></path>
                      </svg>
                    </span>
                    <p className="font-semibold">Sign in with Google</p>
                  </Button>

                  <Button
                    color="primary"
                    variant="flat"
                    className="flex w-full rounded-lg outline-gray-300 hover:bg-gray-100"
                    onClick={() => {
                      authenticate(locale);
                      onClose();
                    }}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-twitter-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                      </svg>
                    </span>
                    <p className="font-semibold">Sign in with X(Twitter)</p>
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {isOpen ? (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-20 bg-black/40"></div>
      ) : (
        <></>
      )}
    </>
  );
}
