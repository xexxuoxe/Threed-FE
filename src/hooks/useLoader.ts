// 간단한 커스텀 훅 예시입니다.
// 페이지나 컴포넌트에서 로딩 상태를 관리할 수 있습니다.

import { useState } from "react";

export function useLoader() {
  const [loading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return { loading, startLoading, stopLoading };
}