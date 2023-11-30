import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Carros from '../entities/Carros';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH : string = 'carros';
  constructor(private firestore : AngularFirestore, private storage : AngularFireStorage) { }

  read(){
    return this.firestore.collection(this.PATH).snapshotChanges();
  }

  create(carros : Carros){
    return this.firestore.collection(this.PATH).add({modelo: carros.modelo, marca: carros.marca, ano: carros.ano, price: carros.price, carroceria: carros.carroceria});
  }

  createWithAvatar(carros: Carros){
    return this.firestore.collection(this.PATH).add({modelo: carros.modelo, marca: carros.marca, ano: carros.ano, price: carros.price, carroceria: carros.carroceria, downloadURL : carros.downloadURL});
  }

  update(carros: Carros, id: string){
    return this.firestore.collection(this.PATH).doc(id).update({modelo: carros.modelo, marca: carros.marca, ano: carros.ano, price: carros.price, carroceria: carros.carroceria});
  }

  updateWithAvatar(carros: Carros, id: string){
    return this.firestore.collection(this.PATH).doc(id).update({modelo: carros.modelo, marca: carros.marca, ano: carros.ano, price: carros.price, carroceria: carros.carroceria, downloadURL : carros.downloadURL});
  }

  delete(carros: Carros){
    return this.firestore.collection(this.PATH).doc(carros.id).delete();
  }

  uploadImage(imagem: any, carros: Carros){
    const file = imagem.item(0);
    if(file.type.split('/')[0] != 'image'){
      console.error('Tipo não suportado!!');
      return;
    }
    const path = `imagens/${carros.modelo}_${file.name}`;
    const fileRef = this.storage.ref(path);
    let task = this.storage.upload(path, file);
    task.snapshotChanges().pipe(
      finalize(()=>{
        let uploadFileURL = fileRef.getDownloadURL();
        uploadFileURL.subscribe(resp => {
          carros.downloadURL = resp;
          if(!carros.id){
            this.createWithAvatar(carros);
          }
          else{
            this.updateWithAvatar(carros, carros.id);
          }
        })
      })
    ).subscribe(); //manda executar e retorna um observable, pipe quebra para mandar
  }
}

