'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';
import { TEducationForm } from '@/types/education.type';

interface Props {
    onSubmit: SubmitHandler<TEducationForm>;
}

export default function AddEducationForm({ onSubmit }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TEducationForm>({
        defaultValues: {
            institution: '',
            degree: '',
            startDate: '',
            endDate: '',
            description: '',
        },
    });

    const onSubmitHandler: SubmitHandler<TEducationForm> = async (data) => {
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
                    <Label htmlFor="institution">Institution</Label>
                    <Input
                        id="institution"
                        className="bg-background"
                        {...register('institution', { required: 'Institution name is required' })}
                        placeholder="e.g., Leading University"
                    />
                    {errors.institution && <p className="text-sm text-red-500">{errors.institution.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="degree">Degree</Label>
                    <Input
                        id="degree"
                        className="bg-background"
                        {...register('degree', { required: 'Degree is required' })}
                        placeholder="e.g., BSC in CSE"
                    />
                    {errors.degree && <p className="text-sm text-red-500">{errors.degree.message}</p>}
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
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                        id="endDate"
                        type="date"
                        className="bg-background"
                        {...register('endDate', { required: 'End date is required' })}
                    />
                    {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    rows={4}
                    className="bg-background"
                    {...register('description', { required: 'Description is required' })}
                    placeholder="Briefly describe your education experience..."
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
            </div>

            <div className="pt-4 flex justify-center">
                <Button type="submit" disabled={isSubmitting} className="w-full md:w-1/3">
                    {isSubmitting ? 'Submitting...' : 'Add Education'}
                </Button>
            </div>
        </form>
    );
}
