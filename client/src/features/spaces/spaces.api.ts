import Api from '../../lib/api';
import type { SpaceApiResponse } from '@kodo/shared/types/spaces.types';

export async function getSpaces() {
  const { data } = await Api.get<SpaceApiResponse[]>('spaces');
  return data;
}
