import { useQuery } from '@tanstack/react-query';

import axios, { parseAxiosError } from '@/portainer/services/axios';
import { withError } from '@/react-tools/react-query';

import { buildUrl } from '../user.service';
import { User } from '../types';

import { userQueryKeys } from './queryKeys';

interface CurrentUserResponse extends User {
  forceChangePassword: boolean;
}

export function useLoadCurrentUser({ staleTime }: { staleTime?: number } = {}) {
  return useQuery(userQueryKeys.me(), () => getCurrentUser(), {
    ...withError('无法获取用户详情'),
    staleTime,
  });
}

export async function getCurrentUser() {
  try {
    const { data: user } = await axios.get<CurrentUserResponse>(
      buildUrl(undefined, 'me')
    );

    return user;
  } catch (e) {
    throw parseAxiosError(e as Error, '无法获取用户详情');
  }
}
