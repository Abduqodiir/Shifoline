import {Module} from "@nestjs/common"
import { SeedsService } from "./seeds.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "@modules";
@Module({
    imports: [SequelizeModule.forFeature([User])],
    providers: [SeedsService]
})
export class SeedsModule {}