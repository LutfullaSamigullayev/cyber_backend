import { PartialType, ApiPropertyOptional } from "@nestjs/swagger";
import { CreateShippingMethodDto } from "./create-shipping-method.dto";

export class UpdateShippingMethodDto extends PartialType(
  CreateShippingMethodDto
) {
  @ApiPropertyOptional({ example: false })
  isActive?: boolean;
}
