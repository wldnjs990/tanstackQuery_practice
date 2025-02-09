import { useState } from "react";
import { useFetchTodo, useFetchTodoQuery } from "./api.ts";
export function Todo() {
  const [count, setCount] = useState(1);
  const { todos, loading, error } = useFetchTodo(count);

  const [queryCount, setQueryCount] = useState(1);
  const { data, isLoading, isError } = useFetchTodoQuery(queryCount);

  if (error) return <p>error</p>;
  return (
    <div className="flex gap-10">
      {/* 탄스택 미적용버전 */}

      <div>
        {loading && <p>로딩중...</p>}

        {error && <p>{error}</p>}

        {!loading && (
          <>
            <h2 className="text-3xl text-amber-800">탄스택 미적용</h2>
            <div>
              <p>title : {todos?.title}</p>
              <p>userId : {todos?.userId}</p>
              <p>id : {todos?.id}</p>
              <p>completed : {todos?.completed}</p>
            </div>
          </>
        )}

        <div>
          <p>{count}</p>
          <div className="flex gap-5">
            <button
              onClick={() => setCount((cur) => (cur += 1))}
              className="cursor-pointer p-1 border"
            >
              다음
            </button>
            <button
              onClick={() => setCount((cur) => (cur -= 1))}
              className="cursor-pointer p-1 border"
            >
              이전
            </button>
          </div>
        </div>
      </div>

      {/* 탄스택 적용버전 */}
      <div>
        {isLoading && <p>탄스택 로딩중....</p>}

        {isError && <p>에러발생</p>}

        {!isLoading && !isError && (
          <>
            <h2 className="text-3xl text-amber-800">탄스택 적용</h2>
            <div>
              <p>title : {data?.title}</p>
              <p>userId : {data?.userId}</p>
              <p>id : {data?.id}</p>
              <p>completed : {data?.completed}</p>
            </div>
          </>
        )}

        <div>
          <p>{queryCount}</p>
          <div className="flex gap-5">
            <button
              onClick={() => setQueryCount((cur) => (cur += 1))}
              className="cursor-pointer p-1 border"
            >
              query다음
            </button>
            <button
              onClick={() => setQueryCount((cur) => (cur -= 1))}
              className="cursor-pointer p-1 border"
            >
              query이전
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
