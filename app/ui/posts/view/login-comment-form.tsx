'use client';
import { Button } from '@/app/ui/button';
import { useLoginOpenFromPostContext } from '@/app/components/context/login-open-from-post-provider';
import { useSessionContext } from '@/app/components/context/session-provider';
import { Avatar } from '@nextui-org/react';
import { useLocaleContext } from '@/app/components/context/locale-provider';

export default function LoginCommentForm() {

    const { dict } = useLocaleContext();
    const { session } = useSessionContext();
    const { setIsLoginOpenFromPost } = useLoginOpenFromPostContext();

    return (
        <div>
            {session && session?.user && session.user?.image ? (
                <>
                    {/* localization */}
                    <div className="flex-col mt-4">
                        <div className="flex">
                            <Avatar
                                src={session.user.image}
                                size='sm'
                            />
                            <p className="ml-2 text-center align-middle justify-center">comment something...</p>
                        </div>
                        <div>

                        </div>


                    </div>
                </>
            ) : (
                <>
                    <div className="flex-col rounded-lg mt-4 p-6 text-center bg-gray-200">
                        <p className="flex justify-center text-lg font-semibold text-black">Let&apos;s comment your feeling</p>
                        <div className="flex justify-center mt-4 w-full">
                            <Button className=" flex justify-center bg-orange-500 hover:bg-orange-600 focus-visible:outline-orange-500 active:bg-orange-600"
                                onClick={() => {
                                    setIsLoginOpenFromPost(true);
                                }}
                            >
                                Login
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}