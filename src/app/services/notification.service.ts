import { element } from 'protractor';
import { Injectable, EventEmitter, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifier = new EventEmitter<string>(); // mensagem do snackbar
  notifierModal = new EventEmitter<string>(); // mensagem do modal
  idNotifier = new EventEmitter<string>(); // id a ser passado no modal
  acaoNotifier = new EventEmitter<string>(); // o tipo de acao a ser passado no modal
  elementNotifier = new EventEmitter<ElementRef>(); // tr que será excluída
  constructor() { }

  notify(mensagem: string) {
    this.notifier.emit(mensagem);
  }

  notifyModal(mensagem: string, id: string, acao: string, tr: ElementRef ) {
    this.notifierModal.emit(mensagem);
    this.idNotifier.emit(id);
    this.acaoNotifier.emit(acao);
    this.elementNotifier.emit(tr);
  }

}
