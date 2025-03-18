import { AppDataSource } from "../config/data-source";
import Credential from "../entities/Credential";
import { CreateCredentialDto } from "../dtos/ICreateCredentialDto";

const credentialRepository = AppDataSource.getRepository(Credential);

export const createCredential = async (dto: CreateCredentialDto): Promise<Credential> => {
    const credential = credentialRepository.create(dto);
    return await credentialRepository.save(credential);
};

export const validateCredential = async (username: string, password: string): Promise<Credential | null> => {
    return await credentialRepository.findOneBy({ username, password });
};
