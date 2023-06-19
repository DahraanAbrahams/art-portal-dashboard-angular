export interface Post {
    title: string,
    permalink: string,
    category: {
        categoryId: string,
        category: string
    },
    postImg: string,
    summary: string,
    content: string,
    views: number,
    status: string,
    createdAt: Date,
}
