import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// 탄스택 쿼리 미적용 훅
const useFetchTodo = (count: number) => {
  const [todos, setTodos] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 일반 커스텀 훅
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/todos/${count}`
        );
        setTodos(res.data);
      } catch (error) {
        setError("데이터 요청에 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [count]);

  return { todos, loading, error };
};

// 탄스택 쿼리 적용 훅
const useFetchTodoQuery = (queryCount: number) => {
  const fetchTodos = async (): Promise<Todo> => {
    const res = await axios.get<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${queryCount}`
    );
    return res.data;
  };

  const { data, isLoading, isError, error, refetch } = useQuery<Todo>({
    queryKey: ["todos", queryCount],
    queryFn: fetchTodos,
    staleTime: 5 * 1000,
  });

  return { data, isLoading, isError, error, refetch };
};

export { useFetchTodo, useFetchTodoQuery };
