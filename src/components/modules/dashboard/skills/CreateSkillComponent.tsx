'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';

type TSkillForm = {
    name: string;
    type: string;
    icon: FileList | null;
};

interface AddSkillPageProps {
    onSubmit: SubmitHandler<TSkillForm>;
}

export default function AddSkillPage({ onSubmit }: AddSkillPageProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TSkillForm>({
        defaultValues: {
            name: '',
            type: '',
            icon: null,
        },
    });

    const onSubmitHandler: SubmitHandler<TSkillForm> = async (data) => {
        try {
            await onSubmit(data);
        } catch (err) {
            console.error(err);
            toast.error('Submission failed');
        }
    };

    return (
        <div className="container mx-auto py-10 px-2 md:px-10">
            <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="space-y-6"
            >
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className="space-y-2">
                        <Label htmlFor="name">Skill Name</Label>
                        <Input
                            id="name"
                            className='bg-background'
                            {...register('name', { required: 'Skill name is required' })}
                            placeholder="e.g., Node.js"
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="type">Skill Type</Label>
                        <Input
                            id="type"
                            className='bg-background'
                            {...register('type', { required: 'Type is required' })}
                            placeholder="e.g., Programming Language"
                        />
                        {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="icon">Skill Icon</Label>
                        <Input
                            id="icon"
                            type="file"
                            className='bg-background'
                            accept="image/*"
                            {...register('icon', {
                                required: 'Icon is required',
                                validate: {
                                    fileSize: (value) =>
                                        !value || !value[0] || value[0].size < 5 * 1024 * 1024 || 'Max 5MB allowed',
                                    fileType: (value) =>
                                        !value || !value[0] || ['image/png', 'image/jpeg', 'image/webp'].includes(value[0].type) ||
                                        'Only JPG, PNG, or WEBP allowed',
                                },
                            })}
                        />
                        {errors.icon && <p className="text-sm text-red-500">{errors.icon.message}</p>}
                    </div>
                </div>


                <div className="pt-4 flex justify-center">
                    <Button type="submit" disabled={isSubmitting} className="w-full md:w-1/3">
                        {isSubmitting ? 'Submitting...' : 'Add Skill'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
