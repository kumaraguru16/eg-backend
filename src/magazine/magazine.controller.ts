import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMagazineDto } from './dto/create-magazine.dto';
import { UpdateMagazineDto } from './dto/update-magazine.dto';
import { Magazine } from './entities/magazine.entity';
import { MagazineService } from './magazine.service';

@ApiTags('Magazine')
@Controller('magazine')
export class MagazineController {
  constructor(private readonly magazineService: MagazineService) {}

  /**
   * Creates a new magazine entry in the database.
   *
   * This method handles HTTP POST requests to the base path associated with magazines.
   * It uses the body of the request, which should be a `CreateMagazineDto` object,
   * to create a new magazine entry via the magazine service.
   *
   * @Post() - Decorator that maps this function to handle POST requests at the route it's associated with.
   * @param {CreateMagazineDto} createMagazineDto - Data Transfer Object (DTO) for creating a magazine.
   *        Contains the necessary data for creating a new magazine entry.
   * @returns The result of the magazine creation process, typically the newly created magazine object.
   */
  @Post()
  @ApiCreatedResponse({
    description: 'Created magazine object as response',
    type: Magazine,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body() createMagazineDto: CreateMagazineDto) {
    // Calls the magazineService's create method, passing in the createMagazineDto,
    // which contains the data for the new magazine. The service is responsible for
    // handling the business logic of creating the magazine entry in the database.
    return await this.magazineService.create(createMagazineDto);
  }

  /**
   * Handles the HTTP GET request to find and return all magazine entities.
   *
   * @Get() decorator specifies that this method is an endpoint handler for HTTP GET requests.
   * The specific route path can vary depending on the controller's base route.
   *
   * @returns {Promise<Array>} A promise that resolves to an array of magazine entities.
   */
  @Get()
  @ApiAcceptedResponse({
    description: 'Get all magazine object as response',
    type: [Magazine],
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findAll() {
    // Calls the findAll method of the magazineService.
    // This service is presumably injected into the controller class where this method resides.
    // The findAll method of the service is responsible for retrieving all magazine entities from the database or any data source it manages.
    return await this.magazineService.findAll();
  }

  /**
   * Handles the request to get all magazines with subscriptions for a given user.
   *
   * @route GET /list
   * @param {number} id - The ID of the user for whom to find magazines with subscriptions.
   * @returns {Promise<Magazine[]>} A promise that resolves with an array of Magazine objects.
   * @ApiAcceptedResponse Decorator that specifies the API's accepted response structure and description.
   * @ApiInternalServerErrorResponse Decorator indicating how the API responds in case of an internal server error.
   */
  @Get('list')
  @ApiAcceptedResponse({
    description: 'Get all magazine object with subscription as response',
    type: Magazine,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findMagazineWithSubscription(@Query('userId') id: number) {
    // Calls the magazineService to find magazines with subscriptions for the given user ID and returns the result.
    return await this.magazineService.findMagazineWithSubscription(id);
  }

  /**
   * Handles the HTTP GET request for fetching a magazine by its unique identifier.
   *
   * @param {number} id - The unique identifier of the magazine to be fetched.
   * @returns The magazine entity that matches the provided id.
   */
  @Get(':id') // Defines the route. The ':id' is a route parameter.
  @ApiAcceptedResponse({
    description: 'Get particular magazine object as response',
    type: Magazine,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findOne(@Param('id') id: number) {
    return await this.magazineService.findOne(id); // Calls the findOne method of magazineService with the provided id and returns its result.
  }

  /**
   * Handles the HTTP PATCH request to update a magazine resource.
   *
   * @param {number} id - The unique identifier of the magazine to update.
   * @param {UpdateMagazineDto} updateMagazineDto - Data Transfer Object containing the updates.
   * @returns The updated magazine resource.
   */

  @Patch(':id') // Decorator indicating this method handles PATCH requests at the route ':id'.
  @ApiAcceptedResponse({
    description: 'Update particular magazine object as response',
    type: Magazine,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(
    @Param('id') id: number,
    @Body() updateMagazineDto: UpdateMagazineDto,
  ) {
    // Calls the update method of magazineService with the provided id and updateMagazineDto,
    // then waits for the promise to resolve and returns the updated magazine resource.
    return await this.magazineService.update(id, updateMagazineDto);
  }

  /**
   * Handles the DELETE request to remove a magazine by its ID.
   *
   * @param {string} id - The unique identifier of the magazine to be removed.
   * @returns A promise that resolves to the result of the remove operation.
   */
  @Delete(':id') // Decorator that marks the function to handle DELETE requests at the path ':id', where ':id' is a dynamic parameter.
  @ApiAcceptedResponse({
    description: 'Soft delete particular magazine object as response',
    type: Magazine,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async remove(@Param('id') id: number) {
    // Calls the remove method of magazineService with the id converted to a number,
    // and returns its promise, which resolves to the result of the deletion operation.
    await this.magazineService.remove(id);
    return { message: 'success' };
  }
}
