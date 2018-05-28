import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface items
{
	name:string;
	price:number;
}

interface itemsid extends items
{
	itemsId:string;
}
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})



export class ProductComponent implements OnInit {

itemsCol :AngularFirestoreCollection<items>;
	data:any;

	id:string;
	name:string;
	price:number;
	itemDoc :AngularFirestoreDocument<items>;
	item:Observable<items>;
	constructor(private afs:AngularFirestore)
	{

	}
	ngOnInit()
	{
		this.reset();
		this.itemsCol=this.afs.collection('items');
		//this.data = this.itemsCol.valueChanges();
		this.data = this.itemsCol.snapshotChanges()
		.map(action =>{
			return action.map(a =>{
				var record =a.payload.doc.data() as items;
				var id = a.payload.doc.id;
				return {id,record};
			})
		});

	}

	add(id)
	{
		if(id==null)
		{	
			this.afs.collection('items').add({'name':this.name,'price':this.price});
			this.reset();

		}
		else
		{
			this.afs.doc('items/'+id).update({'name':this.name,'price':this.price});
		this.reset();
		}
	}

	getItem(itemId){
		this.itemDoc=this.afs.doc('items/'+itemId);
		this.item = this.itemDoc.valueChanges()
		 this.name =itemId.record.name;
		 this.price =itemId.record.price;
		let a = 'true';
	}

	delete(id)
	{	
		if (id)
		{
			if (confirm("Are You Sure Delete This Record")==true) 
			{
				this.afs.doc('items/'+id).delete();
			}
		}
	}

	update(data,id)
	{
		this.id = id;
		this.name =data.record.name;
		this.price =data.record.price;
	}

	reset()
	{
		this.id =null;
		this.name ='';
		this.price =0;
	}


}
