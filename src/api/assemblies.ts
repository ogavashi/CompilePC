import { Assembly, User, UserAssembly } from '../../types/index';
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
  save: async (user: User, assembly: Assembly): Promise<string> => {
    const saveAssembly = functions.httpsCallable('saveAssembly');
    const { data: assemblyId }: { data: string } = await saveAssembly({
      user,
      assembly,
    });
    return assemblyId;
  },
};

export default Assemblies;