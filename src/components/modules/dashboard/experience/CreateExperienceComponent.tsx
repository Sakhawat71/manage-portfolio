'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TExperienceForm } from '@/types/experience.type';
import toast from 'react-hot-toast';

interface Props {
    onSubmit: SubmitHandler<TExperienceForm>;
}

export default function AddExperienceForm({ onSubmit }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TExperienceForm>({
        defaultValues: {
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            description: '',
        },
    });

    const onSubmitHandler: SubmitHandler<TExperienceForm> = async (data) => {
        try {
            await onSubmit(data);
        } catch (err) {
            console.error(err);
            toast.error('Submission failed');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6 px-2 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                        id="company"
                        className="bg-background"
                        {...register('company', { required: 'Company is required' })}
                        placeholder="e.g., AuthLab"
                    />
                    {errors.company && <p className="text-sm text-red-500">{errors.company.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                        id="position"
                        className="bg-background"
                        {...register('position', { required: 'Position is required' })}
                        placeholder="e.g., Backend Developer"
                    />
                    {errors.position && <p className="text-sm text-red-500">{errors.position.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                        id="startDate"
                        type="date"
                        className="bg-background"
                        {...register('startDate', { required: 'Start date is required' })}
                    />
                    {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="endDate">End Date (optional)</Label>
                    <Input
                        id="endDate"
                        type="date"
                        className="bg-background"
                        {...register('endDate')}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    rows={4}
                    className="bg-background"
                    {...register('description', { required: 'Description is required' })}
                    placeholder="Describe your responsibilities and accomplishments..."
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
            </div>

            <div className="pt-4 flex justify-center">
                <Button type="submit" disabled={isSubmitting} className="w-full md:w-1/3">
                    {isSubmitting ? 'Submitting...' : 'Add Experience'}
                </Button>
            </div>
        </form>
    );
}
