import {firestore} from 'firebase-admin';
import {Injectable} from "@decorators/di";

@Injectable()
class ClientRepository {
    create(client: Object) {
        return firestore().collection('clients').add(client);
    }

    read() {
        return firestore().collection('clients').get();
    }

    update(id: string, client: Object) {
        return firestore().collection('clients').doc(id).update(client);
    }

    delete(id: string) {
        return firestore().collection('clients').doc(id).delete();
    }

    find(id: string) {
        return firestore().collection('clients').doc(id).get();
    }
}

export default new ClientRepository();