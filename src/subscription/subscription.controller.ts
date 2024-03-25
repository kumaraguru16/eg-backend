import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
@ApiTags('Subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  /**
   * Activates a subscription.
   *
   * This endpoint is a POST request handler that activates a subscription by setting the subscription's
   * validity to 30 days from the current date. It receives the subscription details through the request body.
   *
   * @param {CreateSubscriptionDto} createSubscriptionDto - Data Transfer Object containing the subscription details.
   * @returns {Promise<any>} A promise that resolves to the activated subscription object.
   */
  @Post('activate')
  @ApiCreatedResponse({
    description: 'Created subscription object as response',
    type: Subscription,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async activate(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    // Create a new Date object representing the current date and time.
    let subscriptionValid = new Date();
    // Set the 'subscriptionValid' date to 30 days ahead of the current date.
    subscriptionValid.setDate(subscriptionValid.getDate() + 30);
    // Call the subscription service's activate method with the DTO and the calculated 'subscriptionValid' date,
    // then wait for it to complete and return the result.
    return await this.subscriptionService.activate({
      ...createSubscriptionDto,
      subscriptionValid,
    });
  }

  /**
   * Handles the cancellation of a subscription.
   *
   * This endpoint receives a POST request to cancel a subscription. It expects the request
   * body to conform to the structure defined by `CreateSubscriptionDto`, which includes
   * the necessary information for cancelling a subscription.
   *
   * @param {CreateSubscriptionDto} createSubscriptionDto - The subscription details needed for cancellation.
   * @returns {Promise<any>} - The result of the cancellation operation, typically confirmation information.
   */
  @Post('cancel')
  @ApiAcceptedResponse({
    description: 'Cancel subscription object as response',
    type: Subscription,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async cancel(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    // Calls the cancel method of the subscriptionService with the provided DTO (Data Transfer Object),
    // which contains the information needed to cancel a subscription.
    return await this.subscriptionService.cancel(createSubscriptionDto);
  }

  /**
   * Retrieves all subscriptions.
   *
   * This endpoint handles GET requests to fetch a list of all subscriptions managed by the service.
   * It utilizes the `findAll` method of the `subscriptionService` to retrieve this information,
   * which is then returned to the requester. This method does not require any parameters,
   * making it straightforward to use for obtaining a comprehensive list of subscriptions.
   *
   * @returns {Promise<any[]>} - A promise that resolves with an array of subscription records.
   */
  @Get()
  @ApiAcceptedResponse({
    description: 'Get all subscription object as response',
    type: [Subscription],
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findAll() {
    // Calls the `findAll` method of the `subscriptionService` to retrieve all subscription records.
    // The `await` keyword is used to pause execution until the Promise returned by `findAll` is resolved.
    return await this.subscriptionService.findAll();
  }

  /**
   * Retrieves a subscription by the user ID.
   *
   * This endpoint handles GET requests to fetch a subscription associated with a specific user ID.
   * The user ID is passed as a path parameter in the request URL. This method utilizes the
   * `findByUserId` method of the `subscriptionService` to perform the retrieval based on the
   * provided ID. The result is a subscription object that corresponds to the requested user ID,
   * if it exists.
   *
   * @param {number} id - The ID of the user whose subscription is to be retrieved. It is extracted
   * from the URL path parameter named 'id'.
   * @returns {Promise<any>} - A promise that resolves with the subscription details of the specified
   * user. If no subscription is found, the promise resolves to null or throws an error, depending
   * on the implementation of `subscriptionService.findByUserId`.
   */
  @Get('list')
  @ApiAcceptedResponse({
    description: 'Get particular user subscription object as response',
    type: [Subscription],
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findByUserId(@Query('userId') id: number) {
    // Calls the `findByUserId` method of the `subscriptionService`, passing the user ID as an argument.
    // This service method is responsible for retrieving the subscription details for the specified user ID.
    // The `await` keyword is used to wait for the promise returned by `findByUserId` to resolve.
    return await this.subscriptionService.findByUserId(id);
  }
}
