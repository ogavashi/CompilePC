import { SaveAssemblyDto, User, UserAssembly } from '../../types/index';
import functions from '../common/firebaseFunctons';

const Assemblies = {
  get: async (id: string): Promise<UserAssembly> => {
    const getAssembly = functions.httpsCallable('getAssembly');
    const { data: assembly }: { data: UserAssembly } = await getAssembly({
      id,
    });
    return assembly;
  },
  list: async (userId: string): Promise<UserAssembly[]> => {
    const getAssemblies = functions.httpsCallable('getAssemblies');
    const { data: assemblies }: { data: UserAssembly[] } = await getAssemblies({
      userId,
    });
    return assemblies;
  },
  save: async (
    title: string,
    user: User,
    assembly: SaveAssemblyDto,
  ): Promise<string> => {
    const saveAssembly = functions.httpsCallable('saveAssembly');

    const { data: assemblyId }: { data: string } = await saveAssembly({
      title,
      user,
      assembly,
    });
    return assemblyId;
  },
  update: async (
    assemblyId: string,
    title: string,
    user: User,
    assembly: SaveAssemblyDto,
  ): Promise<string> => {
    const updateAssembly = functions.httpsCallable('updateAssembly');

    const { data: updatedId }: { data: string } = await updateAssembly({
      assemblyId,
      title,
      user,
      assembly,
    });
    return updatedId;
  },
  delete: async (assemblyId: string, userId: string) => {
    const removeAssembly = functions.httpsCallable('removeAssembly');

    await removeAssembly({
      assemblyId,
      userId,
    });
  },
};

export default Assemblies;
