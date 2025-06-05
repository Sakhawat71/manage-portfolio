export interface IBlogs {
    id: string;
    title: string;
    contentHtml: string;
    contentJson: JSON;
    slug: string;
    tags: string[];

    publishedAt: Date;
    isPublished: boolean;

    createdAt: Date;
    updatedAt: Date;
}