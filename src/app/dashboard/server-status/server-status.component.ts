import { Component, DestroyRef, OnDestroy, OnInit, effect, inject, signal } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit {

  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');
  // private interval?: ReturnType<typeof setInterval>;
  private destroyRef = inject(DestroyRef);

  constructor(){
    effect(() => { // with this function angular set a subscription to a signal
      console.log(this.currentStatus()); //The status change will be logged to console after any change
    });
  }

  ngOnInit() {
    console.log('ON INIT');
    // this.interval = setInterval(() => {
    const interval = setInterval(() => {
      const rnd = Math.random();

      if (rnd < 0.5) {
        this.currentStatus.set('online');
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);

    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    });
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log('AFTER VIEW INIT');

  }

  // ngOnDestroy() {
  //   clearTimeout(this.interval);
  // }

  // new version
}
