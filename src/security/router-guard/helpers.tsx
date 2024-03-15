import { clientPath, loginPath, publicPath } from "./";

export const isPath = (pathname: string) => {
  const relativeWith = (...others: string[]) =>
    others.some((each) => isChildPath(pathname, each));
  const isEmpty = () => ["", "/", null, undefined].includes(pathname);
  const isClientPath = () => clientPath.includes(pathname);
  const isPrivatePath = () => !relativeWith(...publicPath);
  const isLoginPath = () => loginPath.includes(pathname);
  return {
    isEmpty,
    isPrivatePath,
    isClientPath,
    relativeWith,
    isLoginPath,
  };
};

/**
 * parent: /a/b
 * child: /a/b/c, /a/b/c/d
 */
export const isChildPath = (child?: string | null, parent?: string | null) => {
  if (
    child == null ||
    parent == null ||
    child == undefined ||
    parent == undefined
  ) {
    return false;
  }

  const s1 = child.split("/");
  const s2 = parent.split("/");
  return s2.every((e) => s1.includes(e));
};

/**
 * when rules come from multiple parents, the closest parent rules will be applied
 */
