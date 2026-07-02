import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { GetAccountModel } from 'src/app/models/account/get-account-model';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user/user-model';
import { UserService } from 'src/app/services/user-service';
import Chart from 'chart.js/auto';
import { UserActivityProgressHistoricService } from 'src/app/services/user-activity-progress-historic-service';
import { UserHistoricSixMonthsModel } from 'src/app/models/userActivityProgress/user-progress-six-months-model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PerfilPage implements OnInit {

  user?: UserModel;
  data: UserHistoricSixMonthsModel[] = []

  constructor(private router: Router, private userService: UserService,
    private userActivityProgressHistoricService: UserActivityProgressHistoricService
  ) { }

  async ngOnInit() {
    this.userInfo();
  }

  userInfo() {
    try {
      this.userService.userInfo().subscribe({
        next: (result) => {
          this.user = result;
          this.carregarDashboard(this.user?.id);
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.log('Request completed');
        }
      })
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }

  readonly ranks = [
    { xp: 0, title: 'Aprendiz Arcano' },
    { xp: 100, title: 'Iniciado' },
    { xp: 300, title: 'Feiticeiro' },
    { xp: 700, title: 'Mago' },
    { xp: 1200, title: 'Arquimago' },
    { xp: 2000, title: 'Mestre Arcano' },
    { xp: 2800, title: 'Guardião dos Grimórios' },
    { xp: 4000, title: 'Sábio das Runas' },
    { xp: 6000, title: 'Charmed One' }
  ];


  get currentRank() {
    return (
      [...this.ranks]
        .reverse()
        .find(rank => (this.user?.score ?? 0) >= rank.xp)
    ) || this.ranks[0];
  }

  get currentLevel() {
    return this.ranks.findIndex(
      rank => rank.title === this.currentRank.title
    ) + 1;
  }

   get nextRank() {
    return this.ranks[this.currentLevel];
  }

  get progressPercentage() {

    if (!this.nextRank) {
      return 100;
    }

    const currentXp = this.currentRank.xp;
    const nextXp = this.nextRank.xp;

    return (
      (((this.user?.score ?? 0) - currentXp) /
      (nextXp - currentXp))
      * 100
    );
  }

  async logout(){
    await Preferences.remove({
      key: 'token'
    });
    this.router.navigate(['/login']);
  }

  async carregarDashboard(userId: string | undefined){

    if(!userId){
      return;
    }

    await this.userActivityProgressHistoricService.findHistoricSixMonths(userId).subscribe({
      next: (value) => {
        this.data = value;
        console.log(this.data);
        const canvas = document.getElementById('acquisitions') as HTMLCanvasElement | null;
        if(!canvas){
          return;
        }
        new Chart(
          canvas,
          {
            type: 'bar',
            data: {
              labels: this.data.map(x => `${x.data} - ${x.level}`),
              datasets: [
                {
                  label: 'Quantidade',
                  data: this.data.map(row => row.quantidade),
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 205, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(153, 102, 255, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)'
                  ],
                }
              ]
            },
            options: {
            plugins: {
              title: {
                display: true,
                text: 'Nível predominante por mês'
              }
            }
          }
          }
        );
      }
    })

  }
}
