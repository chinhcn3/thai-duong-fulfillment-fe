import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Breadcrumb } from "antd";

export const BreadcrumbComponent = () => {
  const router = useRouter();
  const pathSegments = router.asPath
    .split("/")
    .filter((path) => path.length > 0);
  const convertContent = (title: string) => {
    if (router.asPath == "/") {
      return "Trang chủ";
    }
    switch (title) {
      case "Contracts":
        return "Đơn xuất";
      default:
        return title;
    }
  };

  const items =
    router.asPath == "/"
      ? [{ title: "Trang chủ" }]
      : pathSegments.map((segment, index) => {
          // Tạo đường dẫn cho mỗi mục breadcrumb
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          // Chuyển đổi segment thành tiêu đề hiển thị (ví dụ: 'product-detail' -> 'Product Detail')
          let title = segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());
          const checkLastestIndex = pathSegments.length - 1 === index;
          if (title == "Update") {
            title = "Chỉnh sửa";
          }
          return {
            title:
              checkLastestIndex || title == "Chỉnh sửa" ? (
                convertContent(title)
              ) : (
                <Link href={href}>{convertContent(title)}</Link>
              ),
          };
        });
  return <Breadcrumb items={items} />;
};
