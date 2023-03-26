import * as React from 'react';
import { Modal, Label, TextInput, Checkbox, Button } from 'flowbite-react';

const ModalDummy = ({ isOpen, setVisibleModal }) => {
    const [input, setInput] = React.useState({
        title: '',
        body: '',
        category: '',
    });

    const handleChange = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    };

    React.useEffect(() => {}, [input]);

    console.log('render');

    return (
        <Modal
            show={isOpen}
            size='md'
            popup={true}
            onClose={() => setVisibleModal(false)}
        >
            <Modal.Header />
            <Modal.Body>
                <div className='space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8'>
                    <h3 className='text-xl font-medium text-gray-900 dark:text-white'>
                        Buat Thread Baru
                    </h3>
                    <div>
                        <div className='mb-2 block'>
                            <Label htmlFor='email' value='Your email' />
                        </div>
                        <TextInput
                            onChange={(e) => handleChange(e)}
                            name='title'
                            value={input.title}
                            placeholder='Input Title'
                            required={true}
                        />
                    </div>
                    <div>
                        <div className='mb-2 block'>
                            <Label htmlFor='password' value='Your password' />
                        </div>
                        <TextInput
                            id='password'
                            type='password'
                            required={true}
                        />
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-2'>
                            <Checkbox id='remember' />
                            <Label htmlFor='remember'>Remember me</Label>
                        </div>
                        <a
                            href='/modal'
                            className='text-sm text-blue-700 hover:underline dark:text-blue-500'
                        >
                            Lost Password?
                        </a>
                    </div>
                    <div className='w-full'>
                        <Button>Log in to your account</Button>
                    </div>
                    <div className='text-sm font-medium text-gray-500 dark:text-gray-300'>
                        Not registered?
                        <a
                            href='/modal'
                            className='text-blue-700 hover:underline dark:text-blue-500'
                        >
                            Create account
                        </a>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModalDummy;
