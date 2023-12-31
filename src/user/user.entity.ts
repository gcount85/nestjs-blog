import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // 엔티티 객체임을 알려주는 데코레이터. 다른 곳 의존성 주입을 위해 필요.
export class User {
  @PrimaryGeneratedColumn()
  id?: number; // PK, 자동 증분, 데이터 생성 시에는 필요치 않기 때문에 `?` 붙임

  @Column({ unique: true }) // 컬럼으로 인식하는 데코레이터
  email: string; // 유일무이한 값

  @Column({ nullable: true }) // 패스워드에 빈 값 허용(Oauth 소셜 로그인 케이스)
  password: string;

  @Column()
  username: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' }) // 이 부분 주의!
  createdDt: Date = new Date(); // 기본 값을 항상 지정

  @Column({ nullable: true })
  providerId: string; // OAuth 인증 시 식별자 값
}
