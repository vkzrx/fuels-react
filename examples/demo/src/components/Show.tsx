type ShowProps = {
  when: boolean;
  fallback?: JSX.Element;
  children: JSX.Element;
};

function Show(props: ShowProps) {
  if (!props.when && props.fallback) return props.fallback;
  if (!props.when) return null;
  return props.children;
}

export default Show;
