//44
'use client';
import { useActionState } from "react";
import {
    Input,
    Button,
    Textarea,
    Popover,
    PopoverTrigger,
    PopoverContent
} from '@nextui-org/react';
import * as  actions from '@/actions';
import FormButton from '@/components/common/form-button';

//46
interface PostCreateFromProps {
    slug: string;
}
//43
export default function PostCreateForm({slug}: PostCreateFromProps){

    const [formState, action] = useActionState(
        //add slug: string at create-posts
    actions.createPost.bind(null, slug),
    {
        errors:{ }
    }
)  


    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Button color="primary">
                    create a post
                </Button>
            </PopoverTrigger>

            <PopoverContent>
                <form action={action}>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">Create a post</h3>

                        <Input
                        // boolean
                            isInvalid ={!!formState.errors.title}
                            errorMessage={formState.errors.title?.join(', ')}
                            name="title"
                            label="title"
                            labelPlacement="outside"
                            placeholder="Title"/>
                        
                        <Textarea
                        isInvalid ={!!formState.errors.title}
                        errorMessage={formState.errors.title?.join(', ')}
                        name="content"
                        label="Content"
                        labelPlacement="outside"
                        placeholder="Content"
                        />
                        {
                            formState.errors._form ? <div className="rounded p-2 bg-red-200 border border-red-400">{formState.errors._form.join(', ')}</div> : null
                        }
                        <FormButton>
                            Create a Post
                        </FormButton>
                    </div>

                </form>
            </PopoverContent>
        </Popover>
    )
}