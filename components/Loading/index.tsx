import { LoadingProps } from './types';

export function Loading({ icon: Icon, ...rest }: LoadingProps) {
  return <Icon {...rest} />;
}
