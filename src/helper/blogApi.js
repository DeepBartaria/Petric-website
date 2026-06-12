import { get } from "./api"

const headers = {
    "Content-Type": "application/json",
}

export const getAllBlogs = async ({ search = "", page = 1, limit = 10 }) => {
    page = page + 1;
    try {
      const params = new URLSearchParams({
        search,
        page: page.toString(),
        limit: limit.toString(),
      });
  
      const response = await get(`blog/list/forAdmin?${params}`, {
        headers,
      });
      return response;
    } catch (error) {
      console.error("Error fetching blog data:", error);
      return { blogs: [], totalPages: 0, currentPage: 0, total: 0 };
    }
};

export const getBlogById = async (id) => {
  try {
      const response = await get(`blog/${id}`);
      return response;
    } catch (error) {
      console.error("Error fetching blog data:", error);
      return { blog: {} };
    }
  };